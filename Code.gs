//creating the clickable Menu Bar options

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Options')
    .addItem('Swap Devices', 'SwapEdit')
    .addSeparator()
    .addItem('Add New Location', 'NewLocation')
    .addSeparator()
    .addItem('Edit Location', 'EditLocation')
    .addToUi();
}

//Function For Swapping Devices

function SwapEdit() {
  const ui    = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Records');
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    ui.alert('No records found in the Records sheet.');
    return;
  }

  const response = ui.prompt(
    'Swap Device S/N',
    'Enter Store # or MID:',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) return;

  const search = response.getResponseText().trim().toLowerCase();
  if (!search) return;

  const data = sheet.getRange(2, 1, lastRow - 1, 23).getValues();

  const matches = data.reduce(function(acc, row, i) {
    const id     = String(row[1]).toLowerCase();
    const client = String(row[2]).toLowerCase();
    if (id === search || client === search) {
      acc.push({ rowIndex: i + 2, data: row });
    }
    return acc;
  }, []);

  if (matches.length === 0) {
    ui.alert('No records found for: "' + search + '"');
    return;
  }

  if (matches.length === 1) {
    const notes = String(matches[0].data[22]).toLowerCase();
    if (notes.indexOf('clos') !== -1) {
      ui.alert('This location appears to be closed and cannot be edited.');
      return;
    }
    showEditDialog(matches[0].rowIndex);
    return;
  }

  // Multiple matches
  const list = matches.map(function(m) {
    return '  #' + m.data[0] + ' — ' + m.data[1];
  }).join('\n');

  ui.alert('Multiple records found:\n\n' + list + '\n\nSearch again using the exact Record #.');
}

function showEditDialog(rowIndex) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Records');
  const row   = sheet.getRange(rowIndex, 1, 1, 23).getValues()[0];

  var downloaddate1 = '';
  if (row[13] instanceof Date) {
    downloaddate1 = Utilities.formatDate(row[13], Session.getScriptTimeZone(), 'yyyy-MM-dd');
  } else if (row[13]) {
    downloaddate1 = String(row[13]).substring(0, 10);
  }

  var downloaddate2 = '';
  if (row[21] instanceof Date) {
    downloaddate2 = Utilities.formatDate(row[21], Session.getScriptTimeZone(), 'yyyy-MM-dd');
  } else if (row[21]) {
    downloaddate2 = String(row[21]).substring(0, 10);
  }

  const tpl = HtmlService.createTemplateFromFile('EditDialog');
  tpl.rowIndex       = rowIndex;
  tpl.storename      = row[0];  // A - readonly
  tpl.storenum       = row[1];  // B - readonly
  tpl.mid            = row[2];  // C - readonly
  tpl.sdpw1          = row[8];  // I
  tpl.sdpw2          = row[9];  // J
  tpl.sdpw3          = row[10]; // K
  tpl.deviceserial1  = row[7];  // H
  tpl.devicepw1      = row[11]; // L
  tpl.downloaddate1  = downloaddate1;
  tpl.deviceserial2  = row[15]; // P
  tpl.devicepw2      = row[19]; // T
  tpl.downloaddate2  = downloaddate2;
  tpl.notes          = row[22] || ''; // W

  SpreadsheetApp.getUi().showModalDialog(
    tpl.evaluate().setWidth(560).setHeight(600),
    'Swap Device — ' + row[0]
  );
}

// Save the record
function saveRecord(rowIndex, form) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Records');
  const lastRow = sheet.getLastRow();
  const allData = sheet.getRange(2, 1, lastRow - 1, 23).getValues();

  const serialPattern = /^[A-Za-z]{2}\d{5}-[A-Za-z]{2}\d{6}$/;

  if (form.deviceserial1 && !serialPattern.test(form.deviceserial1)) {
    return { success: false, message: 'Invalid serial format for Device 1.' };
  }

  if (form.deviceserial2 && !serialPattern.test(form.deviceserial2)) {
    return { success: false, message: 'Invalid serial format for Device 2.' };
  }

  // Check serial 1 against all records
  if (form.deviceserial1) {
    for (var i = 0; i < allData.length; i++) {
      var checkRow = i + 2;
      if (checkRow === rowIndex) continue; // skip the record being edited
      var s1 = String(allData[i][7]).trim();  // H - device serial 1
      var s2 = String(allData[i][15]).trim(); // P - device serial 2
      if (s1 === form.deviceserial1 || s2 === form.deviceserial1) {
        var notes = String(allData[i][22]).toLowerCase(); // W - notes
        if (notes.indexOf('clos') === -1) {
          return { success: false, message: 'Serial 1 is already assigned to an active location: ' + allData[i][0] + ' (Store #' + allData[i][1] + ').' };
        }
      }
    }
  }

  // Check serial 2 against all records
  if (form.deviceserial2) {
    for (var j = 0; j < allData.length; j++) {
      var checkRow2 = j + 2;
      if (checkRow2 === rowIndex) continue; // skip the record being edited
      var s1b = String(allData[j][7]).trim();  // H - device serial 1
      var s2b = String(allData[j][15]).trim(); // P - device serial 2
      if (s1b === form.deviceserial2 || s2b === form.deviceserial2) {
        var notes2 = String(allData[j][22]).toLowerCase(); // W - notes
        if (notes2.indexOf('clos') === -1) {
          return { success: false, message: 'Serial 2 is already assigned to an active location: ' + allData[j][0] + ' (Store #' + allData[j][1] + ').' };
        }
      }
    }
  }

  sheet.getRange(rowIndex, 8).setValue(form.deviceserial1);
  sheet.getRange(rowIndex, 12).setValue(form.devicepw1);
  sheet.getRange(rowIndex, 14).setValue(form.downloaddate1 ? new Date(form.downloaddate1) : '');
  sheet.getRange(rowIndex, 16).setValue(form.deviceserial2);
  sheet.getRange(rowIndex, 20).setValue(form.devicepw2);
  sheet.getRange(rowIndex, 22).setValue(form.downloaddate2 ? new Date(form.downloaddate2) : '');
  sheet.getRange(rowIndex, 23).setValue(form.notes);

  const storename = sheet.getRange(rowIndex, 1).getValue();
  return { success: true, message: storename + ' saved successfully!' };
}




// Function for Adding A new location

function NewLocation() {
  const tpl = HtmlService.createTemplateFromFile('AddNewDialog');
  SpreadsheetApp.getUi().showModalDialog(
    tpl.evaluate().setWidth(500).setHeight(600),
    'Add New Location'
  );
}

function saveNewLocation(form) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Records');
  const data = sheet.getRange('A2:W').getValues();
  let lastRow = 1;

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] !== '' && data[i][1] !== '' && data[i][2] !== '') lastRow = i + 2;
    if (String(data[i][1]) === String(form.storenum)) {
      const notes = String(data[i][22] || '').toLowerCase();
      if (!notes.includes('clos')) {
        return { success: false, message: 'Store Number ' + form.storenum + ' already exists and is not closed.' };
      }
    }
    if (String(data[i][2]) === String(form.mid)) {
      return { success: false, message: 'Merchant ID ' + form.mid + ' already exists.' };
    }

    // Check serial 1 against existing records
    if (form.serial1) {
      const s1 = String(data[i][7]).trim();  // H - device serial 1
      const s2 = String(data[i][15]).trim(); // P - device serial 2
      if (s1 === form.serial1 || s2 === form.serial1) {
        const notes = String(data[i][22] || '').toLowerCase();
        if (!notes.includes('clos')) {
          return { success: false, message: 'Serial 1 is already assigned to an active location: ' + data[i][0] + ' (Store #' + data[i][1] + ').' };
        }
      }
    }

    // Check serial 2 against existing records
    if (form.serial2) {
      const s1 = String(data[i][7]).trim();  // H - device serial 1
      const s2 = String(data[i][15]).trim(); // P - device serial 2
      if (s1 === form.serial2 || s2 === form.serial2) {
        const notes = String(data[i][22] || '').toLowerCase();
        if (!notes.includes('clos')) {
          return { success: false, message: 'Serial 2 is already assigned to an active location: ' + data[i][0] + ' (Store #' + data[i][1] + ').' };
        }
      }
    }
  }

  const newRow = lastRow + 1;

  sheet.getRange(newRow, 1).setValue(form.businessname);   // A
  sheet.getRange(newRow, 2).setValue(form.storenum);       // B
  sheet.getRange(newRow, 3).setValue(form.mid);            // C
  sheet.getRange(newRow, 5).setValue(form.regmanager);     // E
  sheet.getRange(newRow, 6).setValue(form.phone);          // F
  sheet.getRange(newRow, 7).setValue(form.model1);         // G
  sheet.getRange(newRow, 8).setValue(form.serial1);        // H
  sheet.getRange(newRow, 9).setValue(form.adminpw1);       // I
  sheet.getRange(newRow, 10).setValue(form.adminpw2);      // J
  sheet.getRange(newRow, 11).setValue(form.adminpw3);      // K
  sheet.getRange(newRow, 12).setValue(form.devicepw1);     // L
  sheet.getRange(newRow, 14).setValue(form.downloaddate1 ? new Date(form.downloaddate1) : ''); // N
  sheet.getRange(newRow, 15).setValue(form.model2);        // O
  sheet.getRange(newRow, 16).setValue(form.serial2);       // P
  sheet.getRange(newRow, 17).setValue(form.adminpw1);      // Q mirrors I
  sheet.getRange(newRow, 18).setValue(form.adminpw2);      // R mirrors J
  sheet.getRange(newRow, 19).setValue(form.adminpw3);      // S mirrors K
  sheet.getRange(newRow, 20).setValue(form.devicepw2);     // T
  sheet.getRange(newRow, 22).setValue(form.downloaddate2 ? new Date(form.downloaddate2) : ''); // V
  sheet.getRange(newRow, 23).setValue(form.notes);         // W
  sheet.getRange(newRow, 28).setValue(form.chainnum);      // AB
  sheet.getRange(newRow, 29).setValue(form.chainname);     // AC
  sheet.getRange(newRow, 30).setValue(form.province);      // AD

  return { success: true, message: form.businessname + ' added successfully!' };
}


// Function for Edit Location 

function EditLocation() {
  const ui    = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Records');
  const lastRow = sheet.getLastRow();

  if (lastRow < 3) {
    ui.alert('No records found in the Records sheet.');
    return;
  }

  const response = ui.prompt(
    'Edit Location',
    'Enter Store # or MID:',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) return;

  const search = response.getResponseText().trim().toLowerCase().replace(/^0+/, '');
  if (!search) return;

  const data = sheet.getRange(3, 1, lastRow - 2, 30).getValues();

  const matches = data.reduce(function(acc, row, i) {
    const id     = String(row[1]).trim().toLowerCase().replace(/^0+/, '');
    const client = String(row[2]).trim().toLowerCase();
    if (id === search || client === search) {
      acc.push({ rowIndex: i + 3, data: row });
    }
    return acc;
  }, []);

  if (matches.length === 0) {
    ui.alert('No records found for: "' + search + '"');
    return;
  }

  if (matches.length === 1) {
    showEditLocationDialog(matches[0].rowIndex);
    return;
  }

  const list = matches.map(function(m) {
    return '  #' + m.data[0] + ' — ' + m.data[1];
  }).join('\n');

  ui.alert('Multiple records found:\n\n' + list + '\n\nSearch again using the exact Record #.');
}

function showEditLocationDialog(rowIndex) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Records');
  const row   = sheet.getRange(rowIndex, 1, 1, 30).getValues()[0];

  function fmtDate(val) {
    if (val instanceof Date) return Utilities.formatDate(val, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    if (val) return String(val).substring(0, 10);
    return '';
  }

  const tpl = HtmlService.createTemplateFromFile('EditLocationDialog');
  tpl.rowIndex      = rowIndex;
  tpl.storename     = row[0];   // A
  tpl.storenum      = row[1];   // B
  tpl.mid           = row[2];   // C
  tpl.regmanager    = row[4];   // E
  tpl.phone         = row[5];   // F
  tpl.model1        = row[6];   // G
  tpl.serial1       = row[7];   // H
  tpl.adminpw1      = row[8];   // I
  tpl.adminpw2      = row[9];   // J
  tpl.adminpw3      = row[10];  // K
  tpl.devicepw1     = row[11];  // L
  tpl.downloaddate1 = fmtDate(row[13]); // N
  tpl.model2        = row[14];  // O
  tpl.serial2       = row[15];  // P
  tpl.devicepw2     = row[19];  // T
  tpl.downloaddate2 = fmtDate(row[21]); // V
  tpl.notes         = row[22] || ''; // W
  tpl.chainnum      = row[27] || ''; // AB
  tpl.chainname     = row[28] || ''; // AC
  tpl.province      = row[29] || ''; // AD

  SpreadsheetApp.getUi().showModalDialog(
    tpl.evaluate().setWidth(540).setHeight(620),
    'Edit Location — ' + row[0]
  );
}

function saveEditLocation(rowIndex, form) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Records');
  const lastRow = sheet.getLastRow();
  const data = sheet.getRange(3, 1, lastRow - 2, 30).getValues();

  // Duplicate store number check (excluding current row)
  for (let i = 0; i < data.length; i++) {
    const currentRowIndex = i + 3;
    if (currentRowIndex === Number(rowIndex)) continue;
    if (String(data[i][1]).trim() === String(form.storenum).trim()) {
      const notes = String(data[i][22] || '').toLowerCase();
      if (!notes.includes('clos')) {
        return { success: false, message: 'Store Number ' + form.storenum + ' already exists and is not closed.' };
      }
    }
  }

  // Duplicate serial 1 check (excluding current row)
  if (form.serial1) {
    for (let i = 0; i < data.length; i++) {
      const currentRowIndex = i + 3;
      if (currentRowIndex === Number(rowIndex)) continue;
      const s1 = String(data[i][7]).trim();
      const s2 = String(data[i][15]).trim();
      if (s1 === form.serial1 || s2 === form.serial1) {
        const notes = String(data[i][22] || '').toLowerCase();
        if (!notes.includes('clos')) {
          return { success: false, message: 'Serial 1 is already assigned to an active location: ' + data[i][0] + ' (Store #' + data[i][1] + ').' };
        }
      }
    }
  }

  // Duplicate serial 2 check (excluding current row)
  if (form.serial2) {
    for (let i = 0; i < data.length; i++) {
      const currentRowIndex = i + 3;
      if (currentRowIndex === Number(rowIndex)) continue;
      const s1 = String(data[i][7]).trim();
      const s2 = String(data[i][15]).trim();
      if (s1 === form.serial2 || s2 === form.serial2) {
        const notes = String(data[i][22] || '').toLowerCase();
        if (!notes.includes('clos')) {
          return { success: false, message: 'Serial 2 is already assigned to an active location: ' + data[i][0] + ' (Store #' + data[i][1] + ').' };
        }
      }
    }
  }

  sheet.getRange(rowIndex, 1).setValue(form.storename);
  sheet.getRange(rowIndex, 2).setValue(form.storenum);
  sheet.getRange(rowIndex, 5).setValue(form.regmanager);
  sheet.getRange(rowIndex, 6).setValue(form.phone);
  sheet.getRange(rowIndex, 7).setValue(form.model1);
  sheet.getRange(rowIndex, 8).setValue(form.serial1);
  sheet.getRange(rowIndex, 9).setValue(form.adminpw1);
  sheet.getRange(rowIndex, 10).setValue(form.adminpw2);
  sheet.getRange(rowIndex, 11).setValue(form.adminpw3);
  sheet.getRange(rowIndex, 12).setValue(form.devicepw1);
  sheet.getRange(rowIndex, 14).setValue(form.downloaddate1 ? new Date(form.downloaddate1) : '');
  sheet.getRange(rowIndex, 15).setValue(form.model2);
  sheet.getRange(rowIndex, 16).setValue(form.serial2);
  sheet.getRange(rowIndex, 20).setValue(form.devicepw2);
  sheet.getRange(rowIndex, 22).setValue(form.downloaddate2 ? new Date(form.downloaddate2) : '');
  sheet.getRange(rowIndex, 23).setValue(form.notes);
  sheet.getRange(rowIndex, 28).setValue(form.chainnum);
  sheet.getRange(rowIndex, 29).setValue(form.chainname);
  sheet.getRange(rowIndex, 30).setValue(form.province);

  return { success: true, message: form.storename + ' updated successfully!' };
}










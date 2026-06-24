<h1>📦 Device Inventory Management System</h1>


<p style="line-height: 2;">This project was built in GoogleSheets and Google Apps Script. It was built for managing devices that are spread across multiple locations, examples provided are "Fantasy Franchises". Its purpose is for easy, simple tracking, and optimization of current or future inventory.</p>

<h1>💡 Why Was It Built?</h1>


<p style="line-height: 2;">Having to manage and organize multiple locations is already a hassle, from including devices information, notes, and locations. It can slowly turn into a nightmare. This can gradually lead to a backlog of data being forgotten or rushed. When details are needed immediately, you do not have time to play detective. This project was produced to resolve this. The normally nightmarish datasheet becomes simpler, user-friendly, multi-coordinated search engine. With guided forms, so the data stays clean and tamper-resistant.</p>

<h1>📌  What Does It Do?</h1>

	
<p style="line-height: 2;">Along with having a detailed and updating formula the sheet also implements a custom 'Options Menu' to the Google Sheet. This can be found on the same line as File, Edit, View & Insert at the end of the toolbar, with three separate features:</p>


<h3>🔄 First Feature: Swap Devices</h3>

<p style="line-height: 2;">Need to exchange and/or swap out a device for a specific location and nothing else? This option lets you search by the store number or the stores unique ID. Once the script runs, it populates a simple sleek pop-up window, which allows you to update the new serial number along with any other device information. This feature comes with validation checks built in.</p>


<h3>➕ Second Feature: Add New Location</h3>

<p style="line-height: 2;">Adding a new location is simple and efficient with this clean 3pg form. This form collects everything that is needed including the business name and unique store details. It also checks for duplicates against the current store locations, with an exception of device serials. The validation checks kick in before it saves; so you do not end up with messy or inaccurate data, ensuring that information is accurate to the other data already recorded.</p>


<h3>✏️Third Feature: Edit Location</h3>

<p style="line-height: 2;">Needing to change more than just the device serials? This script is for you. It combines the 'Adding new location' script and the 'Swap locations' script making a hybrid, the best of both worlds. This 3pg form allows you to edit almost everything, whilst also giving a warning for sensitive location data. The same validation checks are also present in this script, ensuring that your edits do not cause any discrepancies.</p>



<h1>📊 The Google Sheets</h1>


<p style="line-height: 2;">The scripts themselves are a user-friendly way to assist the user(s) from NOT accidentally breaking the “Records Sheet”. Which is the foundation for all the data across the related data storage. Stops users from having to edit this sheet was the best solution to protect its integrity. Below is a brief explanation of each tab:</p>


<h3>🗂️ Records</h3>

<p style="line-height: 2;">This is the backbone of the entire inventory dashboard. Every locations complete details are found here. The 'Options menu' scripts reads from and writes to this sheet exclusively. Formula columns handle auto-calculations and will automatically change data across all datasheets/dashboards, making changes quick and simple for its users.</p>


<h3>🔍 Lookup Dashboard</h3>

<p style="line-height: 2;">While it is just called “Dashboard” in the Google Sheets this sheet is one large search function, using the two unique identifiers. You can type in 10-digit ID or a 3 digit Store Number and it will instantly pull up everything for that location, in addition it shows any spare terminals attached to that location. This is a quick way to search up data instead of scrolling through countless record sheets.</p>


<h3>📈 Overview Dashboard</h3>

<p style="line-height: 2;">This dashboard is a quick snapshot of your stores entire inventory. While also displaying the various summary stats across all locations at a glance.</p>



<h3>📋 Report</h3>

<p style="line-height: 2;">Based similarly to the overview dashboard but, it shows store locations instead of store numbers. You pick a specific category from the dropdown menu. The menu then displays every matching location on a table below. Which now shows store info, download dates, current passwords, and any additional notes. It also gives you an idea of how many matches were found; matching its data back with the overview dashboard.</p>

<h3>🔧 Device Spares</h3>

<p style="line-height: 2;">A simple sheet that tracks spare terminals across locations. It also includes a simple search for a device to see which location it belongs to, also includes its availability and other model type in the sheet itself. This information is also shown in the Lookup Dashboard. </p>

<h3>📃 Lists</h3>

<p style="line-height: 2;">This sheet basically holds the dropdown information for the Reports sheet. Should be hidden and not edited as you would need to edit all the formulas in the Reports sheet as well to match.</p>

<h3>👥 Supervisors List</h3>

<p style="line-height: 2;">A simple reference sheet for store managers and regional managers, their names and other details kept separate for easy access in case of promotions or changes in titles.</p>



<h3>🛠️ Built With</h3>

<p>This project was built using the following:</p>
<ul>
<li>Google Apps Script</li>
<li>Google Sheets</li>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
</ul>




📋 Setup

This project has a very simple setup process:

Upload Inventory_Dashboard.xlsx to google sheets
Open Inventory_Dashboard.xlsx in google sheets
Navigate to File → Save As Google Sheets
Refresh the page.
Navigate to Extensions → Apps Script
Paste in the other files (Code.gs and the HTML dialog files. Note that each file must be labelled exactly as seen.Ensure all html files are saved as .html and not as .txt files)
Save and refresh the sheet
An “Options” menu will appear in the menu bar
Click on the Options and you will see the dropdown for the 3 scripts ready to use.
Additional options would be to lock any formula based cells along with the entirety of the overview dashboard and records sheets.
Initial setup takes less than 10 minutes*.

			*(Not inclusive of adding your own data/inventory)


🍿Video
Just a quick walkthrough video that shows an overview of the entire project, while it doesn’t cover everything you get a general idea of what this project is about and its main focus and features.



https://github.com/user-attachments/assets/a453d2c2-d7c7-4b88-9e66-eb1416d31a70

The video consists of free use audio: Seller by Aylex








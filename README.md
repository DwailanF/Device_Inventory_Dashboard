<h1>📦 Device Inventory Management System</h1>


<h5>This project was built in GoogleSheets and Google Apps Script. It was built for managing devices that are spread across multiple locations, examples provided are "Fantasy Franchises". Its purpose is for easy, simple tracking, and optimization of current or future inventory.</h5>

💡 Why Was It Built?


Having to manage and organize multiple locations is already a hassle and time-consuming, including devices, people and rotation schedules, it can slowly turn into a nightmare. This can slowly lead to a backlog of data being left not updated accurately, and when details are needed immediately in emergencies you don’t have time to play detective or a deep dive into if the information is accurate. This project was produced to resolve this. The nightmare of a sheet after this project becomes a simple user-friendly, multi-validation search engine with guided forms so the data stays clean and allows the sheet to stay tamper-resistent.

📌  What Does It Do?

	
Along with having a detailed updating formula system the sheet also implements a custom Options Menu to the Google Sheet. (This can be found on the same  line as File, Edit, View & Insert at the end of the toolbar) with three separate features:


🔄 Swap Devices:

Needing to exchange / swap out a device for a specific location and nothing else? This option lets you search by the store number or their unique ID. Once the script runs, it populates a simple sleek popup window, which allows you to update the new serial and other device information. There are also validation checks which alleviates human error. 


➕ Add New Location

Adding a new location is simple and efficient with this clean 3-page form. This form collects everything that is needed including the business name and unique store details. It also checks for duplicates against the current store locations, (with an exception of device serials). The validation kicks in before saving so you don’t end up with messy or inaccurate data, ensuring that the formatting is accurate to the other data already in the “Records Sheet”.


✏️ Edit Location

Needing to change more than the device serials? This is the script for you. It combines the Adding new location script and the Swap location script making a hybrid, best of both worlds, this 3-page form allows you to edit almost  everything, whilst also giving a warning for sensitive location data. The same validation warnings the other scripts have are also present in this script, ensuring that your edits do not cause any discrepancies.





📊 The Google Sheets

The scripts themselves are a user-friendly way to assist the end user(s) from accidentally breaking the “Records Sheet” which is basically the foundation for all the data across the other sheets, eliminating users having to edit this sheet was the best solution to protect its integrity. Below is a brief explanation of each tab:


🗂️ Records

The backbone of the entire inventory dashboard,. Every location full details are found here. The Options menu scripts reads from and writes to this sheet exclusively. Formula columns handle auto-calculations as well and therefore eliminates any need to change any details from this sheet itself ensuring less human errors or formulas being removed or misplaced.


🔍 Lookup Dashboard

While it is just called “Dashboard” in the google sheet this sheet is basically one long search function, using the two unique identifiers, you can type in 10-digit ID or a 3 digit  Store Number and it instantly pulls up everything for that location, it shows any spare terminals attached to the location. This is basically a quick way to search up data instead of scrolling through the Records sheet and possibly missing what you were looking for.


📈 Overview Dashboard

A quick snapshot view of the entire inventory. Displays summary stats and status across all locations at a glance.



📋 Report

Based similarly to the overview dashboard, but showing locations instead of just the numbers. . Pick a category from the dropdown and it displays every matching location into a table below showing store info, download dates, current passwords, and notes. It also gives you an idea of how many matches were found (still matches back with the overview dashboard).

🔧 Device Spares

A simple sheet that tracks spare terminals across locations. It also includes a simple search for a device to see which location it belongs to, also includes its availability and other model type in the sheet itself. This information is also shown in the Lookup Dashboard. 

📃 Lists

This sheet basically holds the dropdown information for the Reports sheet. Should be hidden and not edited as you would need to edit all the formulas in the Reports sheet as well to match.

👥 Supervisors List

A simple reference sheet for store managers and regional managers, their names and other details kept separate for easy access in case of promotions or changes in titles.



🛠️ Built With

This project was built using the following:
Google Apps Script
Google Sheets
HTML/CSS/JavaScript



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








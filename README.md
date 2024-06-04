# Inventory Management

## Overview
The Inventory Management application is a web-based solution designed to help manage and track inventory items. It allows users to add, edit, delete, view, and scan items using a webcam to automatically detect barcodes. The application features a user-friendly interface built with React and a robust backend powered by Spring Boot.

Used Vercel to deploy frontend and AWS to deploy backend.

## Features
- Add new inventory items with details such as name, description, where to buy, barcode, total number, and image.
- Edit existing inventory items.
- Delete inventory items with confirmation prompts.
- View detailed information about each inventory item.
- Scan barcodes using a webcam and update the inventory count accordingly.
- Responsive and user-friendly interface.

## Technologies Used
- **Frontend:** React, Axios, React Router, Webcam, Quagga
- **Backend:** Spring Boot, Hibernate, MySQL
- **Styling:** Bootstrap, Custom CSS

## Installation

### Prerequisites
- Node.js and npm
- Java JDK
- MySQL

### Backend Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/asrayg/ara-inventory-management.git
   cd inventory-management
   ```

2. **Setup MySQL Database:**
   Create a MySQL database named `inventory_management`.

3. **Configure Application Properties:**
   Open `src/main/resources/application.properties` and update the MySQL database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/inventory_management
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   ```

4. **Build and Run the Backend:**
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. **Navigate to Frontend Directory:**
   ```bash
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Frontend Server:**
   ```bash
   npm start
   ```

## Usage
1. **Access the Application:**
   Open your web browser and navigate to `http://localhost:3000`.

2. **Navigate the Application:**
   - Use the navbar to add new items or scan items using a webcam.
   - View the list of items on the home page.
   - Click on "View" to see detailed information about an item.
   - Click on "Edit" to update an item’s details.
   - Click on "Delete" to remove an item (a confirmation prompt will appear).

3. **Scan Items:**
   - Navigate to the "Scan Item" page using the navbar.
   - Allow camera access when prompted.
   - Click on the "Scan Barcode" button to scan an item's barcode.
   - If the item is found, its details will be displayed, and you can update the inventory count.

## File Structure
```
inventory-management/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ara/inventory_management/
│   │   │   │   ├── controller/
│   │   │   │   ├── exception/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   ├── InventoryManagementApplication.java
│   │   │   ├── resources/
│   │   │   │   ├── application.properties
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Home.js
│   │   │   ├── AddItem.js
│   │   │   ├── EditItem.js
│   │   │   ├── ViewItem.js
│   │   │   ├── ScanItem.js
│   │   ├── App.js
│   ├── package.json
├── README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.

## Acknowledgements
- [React](https://reactjs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [MySQL](https://www.mysql.com/)
- [Bootstrap](https://getbootstrap.com/)
```

# ProjeSIGHT — Project Locator & Infrastructure Monitoring System

ProjeSIGHT is a full-stack, web-based **Geographic Information System (GIS)** and infrastructure project monitoring platform designed to map, track, manage, and report on regional construction, repair, rehabilitation, and procurement projects. 

Equipped with an interactive mapping engine, administrative PSGC location mapping (Philippines), robust financial & procurement tracking, automated official report generation, and security audit logging, ProjeSIGHT provides end-to-end visibility for project managers, engineers, and administrative stakeholders.

---

## 📑 Table of Contents
1. [System Overview](#-system-overview)
2. [Key Features](#-key-features)
3. [Technology Stack](#-technology-stack)
4. [System Architecture](#-system-architecture)
5. [Database Schema Overview](#-database-schema-overview)
6. [User Roles & Access Control](#-user-roles--access-control)
7. [Installation & Setup Guide](#-installation--setup-guide)
8. [API Endpoints](#-api-endpoints)

---

## 🌐 System Overview

Managing regional infrastructure and procurement projects requires tracking spatial locations, financial allocations, procurement timelines, physical execution progress, and official reporting. 

**ProjeSIGHT** unifies spatial location data with financial and physical progress tracking into a single dashboard. Users can inspect projects directly on an interactive map of the Philippines, view site photos, monitor budget vs. contract allocations, identify negative slippage, and generate formatted bi-monthly compliance reports with automated financial totals.

---

## ✨ Key Features

### 🗺️ 1. Interactive GIS Mapping & Location Tracking
- **Spatial Map Interface**: Powered by React-Leaflet, providing marker clustering, tooltips, and dynamic zoom controls.
- **PSGC Administrative Hierarchy**: Integrates Philippine Standard Geographic Code data for accurate location tagging across:
  - **Region**
  - **Province**
  - **City / Municipality**
  - **Barangay**
- **Precise Coordinate Mapping**: Stores and renders exact Latitude and Longitude coordinates.
- **Recenter & Quick Focus**: One-click map re-centering to project coordinates or regional views.

---

### 📊 2. Comprehensive Project & Financial Management
- **Complete Project CRUD**: Create, read, update, archive, and unarchive project records.
- **Financial & Procurement Lifecycle Tracking**:
  - Approved Budget for the Contract (ABC)
  - Amount per Advice of Sub-Allotment (ASA) & ASA Number
  - Mode of Procurement (e.g., Public Bidding, Negotiated Procurement)
  - Key Dates: Date of Issuance, Date of Opening, Notice of Award (NOA), Notice to Proceed (NTP), Contract Date
  - Winning Bidder details & Contract Price
- **Physical Accomplishment & Delivery Monitoring**:
  - Target vs. Actual Delivery Dates
  - Accomplishment Period % & Cumulative %
  - Work Remaining / For Completion %
  - Negative Slippage Tracking (%) to highlight delayed projects
  - Payment Dates & Detailed Remarks
- **Categorized Project Statuses**:
  - 🟢 **Completed**
  - 🟡 **Ongoing**
  - 🔴 **Suspended**
  - ⚪ **Not Started**

---

### 🖨️ 3. Automated Report Generator
- **Official Compliance Reports**: Generates formatted status/update reports (such as Bi-Monthly Repair and Rehabilitation Project Reports).
- **Customizable Signatories & Headers**:
  - Configurable Office Name (e.g., *Regional Office 1*)
  - "As of Date" timestamping
  - "Prepared By" (Name & Designation)
  - "Noted By" (Manager / Director Designation)
- **Status Filtering**: Filter reports by Completed, Ongoing, Suspended, or All status categories.
- **Automated Financial Summation**: Calculates totals for Approved Budget, Contract Prices, and project counts automatically.
- **Print & PDF Export Ready**: Styled specifically for clean printouts and official PDF document exports.

---

### 🛡️ 4. Role-Based Access Control (RBAC) & Authentication
- **Secure Authentication**: JWT (JSON Web Token) authentication with session expiration detection and automatic timeout modals.
- **Password Encryption**: Hashed passwords using `bcryptjs`.
- **Granular User Roles**:
  - **Admin**: Full system access (Create, Edit, Delete, Archive, User Management, Audit Logs).
  - **Staff**: Operational access (Create, Edit, View, Report Generation).
  - **Viewer**: Read-only access to map visualization, project details, and reports.
- **Administrative User Management Panel**: Add new accounts, edit credentials, update roles, and manage system access.

---

### 📜 5. Security Audit Logging & Governance
- **Operational Audit Trail**: Records system activities (`CREATE`, `UPDATE`, `DELETE`, `ARCHIVE`, `UNARCHIVE`, etc.).
- **Detailed Traceability**: Tracks user ID, associated project ID, timestamp, and JSON payload state for historical accountability.
- **Audit Log Modal**: Filterable, searchable, and printable audit trail interface.

---

### 🖼️ 6. Site Media & Document Uploads
- **Site Photo Management**: Upload project photos, site progress images, or blueprints via Node.js Multer storage.
- **Visual Modal Preview**: View high-resolution project images within the project details overlay.

---

### 🔗 7. Deep Linking & URL Synchronization
- **State-to-URL Sync**: URL parameters (`?id=123`, `?action=add`, `?action=edit`) dynamically update based on modal state.
- **Direct Shareability**: Share exact project links directly with team members.

---

## 🛠️ Technology Stack

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** (TypeScript) | Component-driven UI architecture |
| **Build Tool & HMR** | **Vite** | Fast bundling & development server |
| **Mapping Engine** | **Leaflet** & **React-Leaflet** | Interactive GIS maps & markers |
| **UI Components & Icons** | **Lucide React** & **React-Toastify** | Modern icons & notification alerts |
| **Backend Runtime** | **Node.js** | Server-side JavaScript environment |
| **Web Framework** | **Express.js** | RESTful API routing & middleware |
| **Database** | **MySQL / MariaDB** | Relational data persistence & spatial queries |
| **Database Connector** | **mysql2/promise** | Asynchronous connection pooling |
| **Authentication & Security** | **JWT** & **Bcrypt.js** | Stateless auth & password encryption |
| **File Uploads** | **Multer** | Multipart image file handling |

---

## 🏗️ System Architecture

```
                       +-----------------------------------+
                       |        Client Browser (React)     |
                       |  - Interactive Leaflet Map        |
                       |  - Project Forms & Modals         |
                       |  - Report Generator               |
                       +-----------------+-----------------+
                                         |
                                 REST API (JSON / HTTP)
                                         |
                       +-----------------v-----------------+
                       |       Express.js Backend          |
                       |  - JWT Auth Middleware            |
                       |  - Project & Location Controllers |
                       |  - Audit Log Logger               |
                       |  - Multer File Uploads            |
                       +-----------------+-----------------+
                                         |
                                 SQL Queries / Mysql2
                                         |
                       +-----------------v-----------------+
                       |        MySQL / MariaDB            |
                       |  - proj_desc_tbl (Projects)       |
                       |  - user_tbl (Users & Roles)       |
                       |  - audit_log_tbl (Audit Logs)     |
                       |  - PSGC Tables (region, province, |
                       |    citymun, brgy)                 |
                       +-----------------------------------+
```

---

## 🗄️ Database Schema Overview

The database is named `projectlocator` and contains the following core tables:

1. **`proj_desc_tbl`**: Master table storing all infrastructure project metadata, financial values, procurement dates, physical progress percentages, location references, image paths, and archive status (`isArchived`).
2. **`user_tbl`**: User accounts storing `username`, hashed `password`, and assigned `role` (`admin`, `staff`, `viewer`).
3. **`audit_log_tbl`**: Governance table tracking `user_id`, `proj_id`, `operation_type`, `payload`, and `created_at`.
4. **`region`**, **`province`**, **`citymun`**, **`brgy`**: Standardized Philippine geographic boundary datasets mapping PSGC codes and administrative descriptions.

---

## 👥 User Roles & Access Control

| Capability | Admin 👑 | Staff 🛠️ | Viewer 👁️ |
| :--- | :---: | :---: | :---: |
| View Interactive Map & Projects | ✅ | ✅ | ✅ |
| View Detailed Project Modals | ✅ | ✅ | ✅ |
| Generate & Print Status Reports | ✅ | ✅ | ✅ |
| Create New Projects | ✅ | ✅ | ❌ |
| Edit Existing Projects | ✅ | ✅ | ❌ |
| Upload Site Photos | ✅ | ✅ | ❌ |
| Archive / Unarchive Projects | ✅ | ❌ | ❌ |
| View Audit Trail Logs | ✅ | ❌ | ❌ |
| User Management (Add/Edit Users) | ✅ | ❌ | ❌ |

---

## 🚀 Installation & Setup Guide

### Prerequisites
- **Node.js** (v18.x or higher)
- **XAMPP / WAMP** or stand-alone **MySQL / MariaDB** server running on port `3306`.

---

### Step 1: Database Setup
1. Open phpMyAdmin or your preferred MySQL client.
2. Create a database named `projectlocator`.
3. Import the database dump file: `projectlocator.sql`.

---

### Step 2: One-Click Startup (Windows)
Double-click the included batch launcher script:
```cmd
Run Program.bat
```
*This launcher will automatically verify dependencies (`npm install`), launch the Node.js backend on port `5000` (or configured port), start the Vite React development server on `http://localhost:5173/`, and open your default browser.*

---

### Step 3: Manual Execution (Alternative)

#### Backend Setup:
```bash
cd projectback
npm install
npm run dev
```

#### Frontend Setup:
```bash
cd Project_Locator
npm install
npm run dev
```

---

## 📡 API Endpoints

### 🔐 Authentication & Users
- `POST /api/login` — Authenticate user & return JWT token.
- `GET /api/users` — Fetch list of users (Admin required).
- `POST /api/users` — Add a new user account.
- `PUT /api/users/:id` — Update user details or role.
- `DELETE /api/users/:id` — Remove a user account.

---

### 🏗️ Projects
- `GET /projects` — Retrieve active projects.
- `GET /projects/archived` — Retrieve archived projects.
- `POST /projects` — Create a new project record (supports image upload).
- `PUT /projects/:id` — Update project details.
- `PUT /projects/:id/archive` — Soft-delete / archive a project.
- `PUT /projects/:id/unarchive` — Restore an archived project.

---

### 🗺️ Geographical Location Data (PSGC)
- `GET /regions` — Fetch all administrative regions.
- `GET /provinces/:regCode` — Fetch provinces by region code.
- `GET /cities/:provCode` — Fetch cities/municipalities by province code.
- `GET /barangays/:citymunCode` — Fetch barangays by city/municipality code.

---

### 📜 Audit Logs
- `GET /api/audit-logs` — Fetch audit log records for accountability reporting.

---

## 📄 License & Attribution
**System Name**: ProjeSIGHT (Project Locator System)  
Developed for regional project monitoring, GIS location mapping, and infrastructure procurement compliance.

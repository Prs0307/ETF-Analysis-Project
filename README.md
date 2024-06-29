

```markdown
# Django-React-ETF Project

This README guides you through setting up the development environment for your Django-React-ETF project, covering both backend (Django) and frontend (React) aspects.

## Prerequisites

* **Python 3.6 or later:** Download and install it from the official website: https://www.python.org/downloads/
* **Node.js and npm (or yarn):** Download and install them from the official website: https://nodejs.org/en

 

**Note:** As our Django and React Both part of projects are integrated into a single codebase, adjust the structure accordingly.

## Setting Up the Backend (Django)
   ```
0. **Clone the Project (Must):**
   Open any Terminal and paste following Command:

   ```bash
   git clone https://github.com/Prs0307/ETF-Analysis-Project.git
   ```

1. **Create a virtual environment (recommended):**
   A virtual environment isolates project dependencies. Here's how to create one within the `Backend` directory using `venv`:

   ```bash
   cd ETF-Analysis-Project
   cd Backend
   python -m venv .venv  # Using ".venv" as the virtual environment name
   ```

2. **Activate the virtual environment:**

   Activate the virtual environment from the `Backend` directory:

   ```bash
   source .venv/bin/activate  # Linux/macOS
   cd .\.venv\Scripts\  # Windows
   ```
   ```bash
   activate # windows

3. **Install project dependencies (Make sure you are in same directory that  of `requirements.txt` ):**

   Install the packages listed in `requirements.txt`:

   ```bash
   cd ..
   cd ..
   pip install -r requirements.txt
   ```

4. **To Proceed  The setup:**

   Change the directory from  `Backend` directory:

   ```bash
    cd ETF_Analysis
   ```
 
4. **Start the development server:**

   ```bash
   python manage.py runserver
   ```

   This will start a development server at `http://127.0.0.1:8000/` by default.

## Setting Up the Frontend (React)

**Note:** These steps assume you have a separate React project within the `Frontend` directory.

1. **Navigate to the Frontend directory : JUST OPEN NEW TERMINAL**

   ```bash
   cd ETF-Analysis-Project
   cd Frontend  # Assuming you're still in the Backend directory
   ```

2. **Install Node.js packages:**

   ```bash
   npm install
   ```

   (Alternatively, if using yarn, run `yarn install`.)

3. **Start the development server:**

   ```bash
   npm run dev  # Or yarn dev
   ```

   This will typically start a React development server at a URL like `http://localhost:5173/` or port '5174' o/w caught cors error .

## Next Steps

* **Backend (Django):**
    * Explore the Django project structure.
    * Create apps using `django-admin startapp`.
    * Write models, views, and templates.
    * Learn about URL routing and Django functionalities.
    * Refer to the official Django documentation for in-depth learning: https://docs.djangoproject.com/en/5.0/
* **Frontend (React):**
    * Follow your React project's specific development instructions for codebase exploration and functionalities.
    * Refer to the official React documentation for in-depth learning: https://legacy.reactjs.org/

## Additional Considerations

* This is a starting point. Explore both Django and React documentation for comprehensive learning and troubleshooting.

* Consider using a code management tool like Git for version control and collaboration.

Remember to adapt this README to your specific project structure and dependencies. Happy coding Guys...!!

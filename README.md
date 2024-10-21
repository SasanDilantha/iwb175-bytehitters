# iwb175-bytehitters

# VoltSync

<h2>Overview on Project Structure</h2>

<p>There are four folders in the structure of this project.</p>
<ol>
  <li>frontend - Implemented using React + Vite</li>
  <li>backend - Implemented using Ballerina</li>
  <li>api - Flask API to communicate with ML models</li>
  <li>ml - ML Models, operational datasets etc.</li>
</ol>

<h2>Dependencies</h2>
<ol>
  <li>Node</li>
  <li>Ballerina</li>
  <li>Python: Version 3.11.5</li>
  <li>Docker</li>
</ol>

<h2>Steps to run the project</h2>
<ol>
  <li>Clone the project from Github and navigate to folders frontend, backend and api via four seperate terminals.</li>
  <li>Navigate to "frontend" folder: cd frontend</li>
    <ol>
      <li>"npm install" - To install Node dependencies</li>
      <li>"npm run dev" - To run the Vite server</li>
    </ol>
  <li>Navigate to "api" folder: cd api</li>
    <ol>
      <li>"pip install -r requirements.txt" - To install python dependencies</li>
      <li>"flask --app api run" - To run the flask api</li>
    </ol>
  <li>Navigate to "backend" folder: cd backend</li>
    <ol>
      <li>"docker compose up -d" - To initialize the docker container and the database</li>
      <li>"bal build" - To download the Ballerina dependencies</li>
      <li>"bal run" - To run the Ballerina backend</li>
    </ol>
</ol>

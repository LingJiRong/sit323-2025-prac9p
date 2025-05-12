# SIT323-2025-Prac9P – MongoDB Integration with Node.js Microservice

This project is a containerized Node.js microservice that connects to a MongoDB database and is deployed using Kubernetes. It supports basic CRUD operations.

## 🔧 Technologies Used

- Node.js
- Express.js
- MongoDB
- Docker
- Kubernetes (Docker Desktop)
- kubectl

---

## 📁 Folder Structure

```
sit323-2025-prac9p/
mongo-deployment.yaml        # MongoDB K8s deployment
app/
index.js                 # Node.js app entry point
package.json             # Dependencies
Dockerfile               # Builds app image
app-deployment.yaml      # App K8s deployment
```

---

## 🚀 How to Run Locally (Kubernetes)

### 1. Clone the Repo

```bash
git clone https://github.com/LingJiRong/sit323-2025-prac9p.git
cd sit323-2025-prac9p
```

### 2. Apply MongoDB Configuration

```bash
kubectl apply -f mongo-deployment.yaml
```

### 3. Build and Push Docker Image

```bash
cd app
docker build -t jirongling/sit323-task9p:latest .
docker push jirongling/sit323-task9p:latest
```

### 4. Apply Node.js Deployment

```bash
kubectl apply -f app-deployment.yaml
```

---

## 🧪 Testing the Application

### Option A: Use Port Forward

```bash
kubectl get pods
kubectl port-forward pod/<your-nodejs-pod> 3000:3000
```

Then open:

```
http://localhost:3000/tasks
```

### Option B: Use CURL (PowerShell)

```powershell
Invoke-RestMethod -Uri http://localhost:3000/tasks -Method Post -ContentType "application/json" -Body '{
  "title": "Finish SIT323 Task 9.1P",
  "done": false
}'
```

### Option C: Use Postman

- URL: `http://localhost:3000/tasks`
- Method: `POST`
- Headers: `Content-Type: application/json`
- Body (JSON):

```json
{
  "title": "Finish SIT323 Task 9.1P",
  "done": false
}
```

---

## ✅ Output Example

### After POST

```json
{
  "acknowledged": true,
  "insertedId": "663fcf218fbf0fd98b4f70f1"
}
```

### After GET `/tasks`

```json
[
  {
    "_id": "663fcf218fbf0fd98b4f70f1",
    "title": "Finish SIT323 Task 9.1P",
    "done": false
  }
]
```
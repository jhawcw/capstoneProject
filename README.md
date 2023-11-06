# Rent@SG

Welcome to Rent@SG! This document will guide you through the installation process.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/) (NodeJs version 18.18.2 LTS)
- npm (Node Package Manager): It comes with Node.js installation.
- Port: 3000 and 3001 are not in used.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/jhawcw/capstoneProject.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd rent@sg/frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Navigate to the backend directory:

   ```bash
   cd rent@sg/backend
   ```

5. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `config.env` file in the backend directory:

   ```env
   DATABASE=mongodb+srv://your-username:<PASSWORD>@example.example.mongodb.net/rent@sg?retryWrites=true&w=majority
   DATABASE_PASSWORD=examplepassword
   JWT_SECRET=some_secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   STRIPE_PUBLIC_KEY=obtain_this_key_from_stripe_api
   STRIPE_PRIVATE_KEY=obtain_this_key_from_stripe_api
   ```

## Running the App

To start the development server,abc run:

```bash
cd /frontend
npm start
```

```bash
cd /backend
npm start
```

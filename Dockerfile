# Use the official Node.js 14 image as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app


# Copy the package.json and package-lock.json files to the container
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm i



# Copy the rest of the application code to the container
COPY . .

# Expose port 3000
EXPOSE 3000:3000

# Start the application
CMD ["npm", "run","dev"]
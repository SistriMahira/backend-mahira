# Gunakan Node.js versi resmi
FROM node:18

# Buat direktori kerja
WORKDIR /app

# Salin file package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Salin semua file ke image
COPY . .

# Ekspose port yang akan digunakan
EXPOSE 3000

# Perintah menjalankan app
CMD ["node", "index.js"]

#!/usr/bin/env node
// generate_photo_pages.js
// This script generates individual photo pages from photos.json

const fs = require('fs');
const path = require('path');

// Read the photos.json file
const photosData = fs.readFileSync('_data/photos.json', 'utf8');
const photos = JSON.parse(photosData);

// Create photo directory if it doesn't exist
const photoDir = 'photo';
if (!fs.existsSync(photoDir)) {
  fs.mkdirSync(photoDir, { recursive: true });
}

// Generate a page for each photo
photos.forEach(photo => {
  const filename = path.join(photoDir, `${photo.title}.html`);
  
  // Create the front matter
  let content = '---\n';
  content += 'layout: photo-page\n';
  content += `title: "${photo.title}"\n`;
  content += `description: "${photo.description}"\n`;
  content += `keywords: "${photo.keywords}"\n`;
  content += 'category:\n';
  photo.category.forEach(cat => {
    content += `  - "${cat}"\n`;
  });
  content += `contentUrl: "${photo.contentUrl}"\n`;
  content += `thumbnailUrl: "${photo.thumbnailUrl}"\n`;
  content += `creditText: "${photo.creditText}"\n`;
  content += `license: "${photo.license}"\n`;
  content += 'creator:\n';
  content += `  title: "${photo.creator.title}"\n`;
  content += `  url: "${photo.creator.url}"\n`;
  content += 'copyrightHolder:\n';
  content += `  title: "${photo.copyrightHolder.title}"\n`;
  content += `  url: "${photo.copyrightHolder.url}"\n`;
  content += '---\n';
  
  // Write the file
  fs.writeFileSync(filename, content);
  console.log(`Generated: ${filename}`);
});

console.log(`\nGenerated ${photos.length} photo pages!`);

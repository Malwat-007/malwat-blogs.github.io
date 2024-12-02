# Modern Single-Page Blog Website

A clean, responsive blog website with modern features and animations. Built with HTML, CSS, and vanilla JavaScript.

## Features

- Responsive design
- Dark/Light mode toggle
- Smooth scroll animations
- Search functionality
- Category filtering
- Dynamic blog loading
- Code syntax highlighting
- Reading time estimation
- Share buttons
- Comment section

## Project Structure
```
blog-website/
├── index.html
├── css/
│   ├── style.css
│   └── prism.css
├── js/
│   ├── main.js
│   ├── darkMode.js
│   └── prism.js
├── images/
│   ├── blog/
│   └── authors/
└── blogs/
    └── content.json
```

## How to Add a New Blog Post

1. Open `blogs/content.json`
2. Add a new blog entry in the following format:
```json
{
  "id": "unique-blog-id",
  "title": "Your Blog Title",
  "author": "Author Name",
  "date": "YYYY-MM-DD",
  "category": "Technology",
  "tags": ["tag1", "tag2"],
  "coverImage": "images/blog/your-image.jpg",
  "content": "Your blog content with HTML markup",
  "readingTime": "5 min"
}
```
3. Add any associated images to the `images/blog/` directory
4. If needed, add author image to `images/authors/` directory

## Deployment

1. Clone this repository
2. Add your blog content to `content.json`
3. Add required images
4. Deploy to any static hosting service (GitHub Pages, Netlify, etc.)

## Markdown Support

The blog content supports basic HTML and the following Markdown-style formatting:
- `# Heading 1`
- `## Heading 2`
- `**Bold Text**`
- `*Italic Text*`
- `` `Code` ``
- ```Code blocks```
- `> Blockquotes`
- `- List items`

## License

MIT License - feel free to use and modify for your own projects.
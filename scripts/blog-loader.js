document.addEventListener("DOMContentLoaded", async () => {
    const blogContent = document.getElementById('blogContent');

    // Get the blog ID from the URL
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');

    if (!blogId) {
        blogContent.innerHTML = "<p>Error: Blog ID not found in the URL.</p>";
        return;
    }

    try {
        // Fetch metadata for the specific blog
        const response = await fetch('blogs/metadata.json');
        const blogs = await response.json();
        const blog = blogs.find(b => b.id === parseInt(blogId));

        if (!blog) {
            blogContent.innerHTML = "<p>Error: Blog not found.</p>";
            return;
        }

        // Fetch and parse the blog content (assumes markdown format)
        const blogResponse = await fetch(`blogs/${blog.filename}`);
        const blogMarkdown = await blogResponse.text();

        // Use a simple Markdown parser (e.g., marked.js or showdown.js)
        const htmlContent = parseMarkdown(blogMarkdown);

        blogContent.innerHTML = `
            <h1>${blog.title}</h1>
            <div class="blog-meta">
                <span>${blog.author}</span>
                <span>${new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <div class="blog-body">${htmlContent}</div>
        `;
    } catch (error) {
        blogContent.innerHTML = `<p>Error loading blog content: ${error.message}</p>`;
    }
});

// Simple markdown parser function
function parseMarkdown(markdown) {
    const rules = [
        { regex: /###### (.*$)/gim, replacement: '<h6>$1</h6>' },
        { regex: /##### (.*$)/gim, replacement: '<h5>$1</h5>' },
        { regex: /#### (.*$)/gim, replacement: '<h4>$1</h4>' },
        { regex: /### (.*$)/gim, replacement: '<h3>$1</h3>' },
        { regex: /## (.*$)/gim, replacement: '<h2>$1</h2>' },
        { regex: /# (.*$)/gim, replacement: '<h1>$1</h1>' },
        { regex: /\*\*(.*?)\*\*/gim, replacement: '<strong>$1</strong>' },
        { regex: /\*(.*?)\*/gim, replacement: '<em>$1</em>' },
        { regex: /!\[(.*?)\]\((.*?)\)/gim, replacement: '<img alt="$1" src="$2" />' },
        { regex: /\[(.*?)\]\((.*?)\)/gim, replacement: '<a href="$2">$1</a>' },
        { regex: /\n$/gim, replacement: '<br />' },
    ];

    return rules.reduce((text, rule) => text.replace(rule.regex, rule.replacement), markdown);
}

function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.querySelector('.theme-toggle').textContent = isDark ? '🌙' : '☀️';
}

document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
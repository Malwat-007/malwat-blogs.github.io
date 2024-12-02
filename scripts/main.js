document.addEventListener("DOMContentLoaded", () => {
    const blogGrid = document.getElementById('blogGrid');
    const modal = document.getElementById('blogModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    const themeToggle = document.querySelector('.theme-toggle');
    const searchInput = document.querySelector('.search-input');
    const categoryFilter = document.getElementById('categoryFilter');
    const authorFilter = document.getElementById('authorFilter');

    // Fetch blog data from metadata.json
    async function fetchBlogs() {
        const response = await fetch('blogs/metadata.json');
        const blogs = await response.json();
        renderBlogs(blogs);
    }

    function renderBlogs(blogsToRender) {
        blogGrid.innerHTML = blogsToRender.map(blog => `
            <article class="blog-card" data-id="${blog.id}">
                <img src="${blog.image}" alt="${blog.title}" class="blog-image">
                <div class="blog-content">
                    <h2 class="blog-title">${blog.title}</h2>
                    <div class="blog-meta">
                        <span>${blog.author}</span>
                        <span>${new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <p class="blog-preview">${blog.preview}</p>
                    <button class="read-more">Read More</button>
                </div>
            </article>
        `).join('');
        attachCardListeners(blogsToRender);
    }

    function attachCardListeners(blogs) {
        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.blog-card');
                const blog = blogs.find(b => b.id === parseInt(card.dataset.id));
                showModal(blog);
            });
        });
    }

    function showModal(blog) {
        fetch(`blogs/${blog.filename}`).then(res => res.text()).then(content => {
            modalContent.innerHTML = content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function toggleTheme() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.textContent = isDark ? '🌙' : '☀️';
    }

    closeModal.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });
    themeToggle.addEventListener('click', toggleTheme);

    fetchBlogs();
});

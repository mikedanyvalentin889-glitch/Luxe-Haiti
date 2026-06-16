.container {
    width: 100%;
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--container-padding);
}

.section {
    padding: var(--space-3xl) 0;
}

.page-header {
    padding: calc(var(--space-3xl) + 60px) 0 var(--space-2xl);
    background: var(--gradient-primary);
    text-align: center;
    position: relative;
    overflow: hidden;
}

.page-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
}

.page-header h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    position: relative;
    z-index: 1;
}

.page-header p {
    color: var(--color-text-secondary);
    margin-top: var(--space-md);
    font-size: 1.125rem;
    position: relative;
    z-index: 1;
}

.text-gradient {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-title {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    margin-bottom: var(--space-xl);
    text-align: center;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xl);
    flex-wrap: wrap;
    gap: var(--space-md);
}

.section-header .section-title {
    margin-bottom: 0;
    text-align: left;
}

.section-link {
    color: var(--color-primary-light);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    transition: gap var(--transition-base);
}

.section-link:hover {
    gap: var(--space-md);
    color: var(--color-accent-light);
}

.page-title {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: var(--space-xl);
}

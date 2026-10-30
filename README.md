# W website

Static website for the W programming language. It uses plain HTML, CSS, and JavaScript, so there is no build step.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy with GitHub Pages

1. Create a GitHub repository and push this directory to its `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. The included `Deploy GitHub Pages` workflow will publish the site after each push to `main`.

All internal URLs are relative, so the site works at both `username.github.io/repository/` and a custom domain.

# Shas Mehandi Website - Common Files

## Common Header and Footer

To avoid duplication, the header (top bar + navigation) and footer sections are stored in separate files:

- `common-header.html` - Contains the top contact bar and main navigation
- `common-footer.html` - Contains the footer with columns

## How to Update

When you need to make changes to the header or footer:

1. Edit `common-header.html` or `common-footer.html`
2. Copy the updated content to all HTML pages (index.html, gallery.html, etc.)
3. Replace the existing header/footer sections

## Future Improvements

For automatic includes, consider using:
- A static site generator (Hugo, Jekyll)
- Server-side includes (SSI) if hosting supports it
- A build script to concatenate files

## File Structure
```
shasmehandi/
├── common-header.html    # Shared header code
├── common-footer.html    # Shared footer code
├── index.html           # Home page
├── gallery.html         # Gallery page
├── offers.html          # Services page
├── contact.html         # Contact page
├── about.html           # About page
├── css/
├── js/
└── images/
```
import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

export default withNextra({
  images: {
    domains: ["i.pravatar.cc", "images.unsplash.com"],
  },
});

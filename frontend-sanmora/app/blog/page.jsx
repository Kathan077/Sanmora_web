import Navbar from "../../components/Navbar/Navbar";
import BlogClient from "../../components/Blog/BlogClient";
import Footer from "../../components/Footer/Footer"; // Assuming a Footer exists, otherwise I'll just use the standard layout.

export const metadata = {
  title: "Blog | Sanmora Technologies",
  description: "Insights and articles from the Sanmora Studio team.",
};

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <BlogClient />
      <Footer />
      {/* Assuming there might be a footer later, keeping it clean for now */}
    </main>
  );
}

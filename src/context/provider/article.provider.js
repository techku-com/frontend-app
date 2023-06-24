import { createContext, useState } from "react";

export const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
  const [article, setArticle] = useState({});

  return (
    <ArticleContext.Provider value={{ article, setArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};
export default ArticleProvider;

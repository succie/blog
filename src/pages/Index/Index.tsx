import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { articlesActions, Article } from "../../store/articles";
import { firestore } from "../../utils/firebase";
import ArticleList from "../../components/ArticleList/ArticleList";

const Index = () => {
  const articles = useSelector((state: RootState) => state.articles.articles);

  const dispatch = useDispatch();

  const articleApi = useCallback(async () => {
    const snapShot = await firestore
      .collection("articles")
      .orderBy("updated_at", "desc")
      .get();
    return snapShot.docs.map(doc => doc.data() as Article);
  }, []);

  const fetchArticles = useCallback(async () => {
    dispatch(articlesActions.fetchArticlesRequest());
    const articles = await articleApi();
    dispatch(articlesActions.fetchArticlesSuccess(articles));
  }, []);

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="Index">
      <ArticleList articles={articles} />
    </div>
  );
};

export default Index;

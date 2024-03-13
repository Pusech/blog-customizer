import { CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [currentStyle, setCurrentStyle] = useState(defaultArticleState);
	return (
		<main>
			<div
				className={styles.main}
				style={
					{
						'--font-family': currentStyle.fontFamilyOption.value,
						'--font-size': currentStyle.fontSizeOption.value,
						'--font-color': currentStyle.fontColor.value,
						'--container-width': currentStyle.contentWidth.value,
						'--bg-color': currentStyle.backgroundColor.value,
					} as CSSProperties
				}>
				<ArticleParamsForm setCurrentStyle={setCurrentStyle} />
				<Article />
			</div>
		</main>
	);
};
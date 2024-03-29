import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import * as articleProps from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
	setCurrentStyle: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	setCurrentStyle,
}) => {
	const [isOpened, setIsOpened] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const menuRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		const closeHandler = (e: Event) => {
			if (!menuRef.current?.contains(e.target as Node)) {
				setIsOpened(false);
			}
		};

		document.addEventListener('mousedown', closeHandler);

		return () => {
			document.removeEventListener('mousedown', closeHandler);
		};
	}, []);

	const toggleButton = () => {
		setIsOpened(!isOpened);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentStyle(formState);
	};

	const handleReset = () => {
		setCurrentStyle(defaultArticleState);
		setFormState(defaultArticleState);
	};
	const className = clsx(styles.container, {
		[styles.container_open]: isOpened,
	});

	return (
		<>
			<ArrowButton
				onClick={() => {
					toggleButton();
				}}
				isOpened={isOpened}
			/>
			<aside className={className} ref={menuRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={formState.fontFamilyOption}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
						options={articleProps.fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='radio'
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
						options={articleProps.fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontColor: value })
						}
						options={articleProps.fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, backgroundColor: value })
						}
						options={articleProps.backgroundColors}
						title='Цвет Фона'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, contentWidth: value })
						}
						options={articleProps.contentWidthArr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

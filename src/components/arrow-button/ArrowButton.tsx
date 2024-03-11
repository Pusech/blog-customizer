import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = {
	onClick: () => void;
	isOpened: boolean;
};

export const ArrowButton = ({ onClick, isOpened }: OnClick) => {
	const buttonClass = clsx(styles.container, {
		[styles.container_open]: isOpened,
	});
	const arrowClass = clsx(styles.arrow, {
		[styles.arrow_open]: isOpened,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={buttonClass}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowClass} />
		</div>
	);
};

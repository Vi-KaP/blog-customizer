import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	isFormOpen?: boolean,
	onClick?: (state: boolean) => void
}

export const ArrowButton = ({isFormOpen, onClick}:ArrowButtonProps) => {
  const onClickHandler = () => {
		onClick?.(!isFormOpen)
	}
	

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onClickHandler();
      }}
			className={clsx(styles.container, isFormOpen && styles.container_open)}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, isFormOpen && styles.arrow_open)} />
		</div>
	);
};

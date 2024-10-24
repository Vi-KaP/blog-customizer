import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setFormOpen] = useState<boolean>(false);

	const [styleState, setStyleState] = useState({
		fontFamily: articleState.fontFamilyOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
		fontSize: articleState.fontSizeOption,
	});

	const rootRef = useRef<HTMLElement | null>(null);

	const handleFormSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		setArticleState({
			...styleState,
			fontFamilyOption: styleState.fontFamily,
			fontColor: styleState.fontColor,
			backgroundColor: styleState.backgroundColor,
			contentWidth: styleState.contentWidth,
			fontSizeOption: styleState.fontSize,
		});
	};
	const handleFormReset = (evt: FormEvent) => {
		evt.preventDefault();
		setStyleState({
			...styleState,
			fontFamily: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSize: defaultArticleState.fontSizeOption,
		}),
			setArticleState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setFormOpen(false),
		onChange: setFormOpen,
	});

	const handleClick = () => {
		setFormOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton isFormOpen={isOpen} onClick={setFormOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={styleState.fontFamily}
						onChange={(selectedOption) =>
							setStyleState((prevState) => ({
								...prevState,
								fontFamily: selectedOption,
							}))
						}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={styleState.fontSize}
						onChange={(selectedOption) =>
							setStyleState((prevState) => ({
								...prevState,
								fontSize: selectedOption,
							}))
						}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={styleState.fontColor}
						onChange={(selectedOption) =>
							setStyleState((prevState) => ({
								...prevState,
								fontColor: selectedOption,
							}))
						}
					/>
					<Separator />

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={styleState.backgroundColor}
						onChange={(selectedOption) =>
							setStyleState((prevState) => ({
								...prevState,
								backgroundColor: selectedOption,
							}))
						}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={styleState.contentWidth}
						onChange={(selectedOption) =>
							setStyleState((prevState) => ({
								...prevState,
								contentWidth: selectedOption,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleClick} />
						<Button title='Применить' type='submit' onClick={handleClick} />
					</div>
				</form>
			</aside>
		</>
	);
};

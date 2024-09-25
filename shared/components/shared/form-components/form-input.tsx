import { ClearButton, ErrorText, RequiredSymbol } from '..';
import { Input } from '../../ui';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormInput: React.FC<Props> = ({
	name,
	label,
	required,
	className,
	...props
}) => {
	return (
		<div className={className}>
			{label && (
				<p className="font-medium mb-2">
					{label} {required && <RequiredSymbol />}
				</p>
			)}
			<div className="relative">
				<Input className="h-12 text-md" {...props} />
				<ClearButton />
			</div>

			<ErrorText text="Поле обязательно для заполнения" className="mt-2" />
		</div>
	);
};

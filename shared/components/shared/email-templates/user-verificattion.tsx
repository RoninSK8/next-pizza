import React from 'react';

interface Props {
	code: string;
}

export const UserVerificattionTemplate: React.FC<Props> = ({ code }) => (
	<div>
		<p>
			Ваш код подтверждения: <h2>{code}</h2>
		</p>
		<hr />
		<p>
			<a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
				Подтвердить регистрацию
			</a>
		</p>
		<p>
			Если вы не регистрировались на нашем сайте, проигнорируйте это письмо.
		</p>
	</div>
);

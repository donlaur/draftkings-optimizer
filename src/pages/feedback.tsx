import React from "react"

import { Main } from '../layouts/main'

export default function FeedbackPage() {
	return (
		<Main>
			<form className="feedback-form form form--white" name="send_feedback" method="POST" data-netlify="true" action="/success">
				<h2 className="form__heading">Comments, suggestions, bugs?</h2>
				<div className="form__row row">
					<div className="form__col col">
						<label className="form__label" htmlFor="name">Your Name:</label>
						<input className="form__input input" type="text" name="name" id="name" placeholder="Name"/>
					</div>
				</div>
				
				<div className="form__row row">
					<div className="form__col col">
						<label className="form__label" htmlFor="email">Your Email:</label>
						<input className="form__input input" type="email" name="email" id="email" placeholder="Email"/>
					</div>
				</div>

				<div className="form__row row">
					<div className="form__col col">
						<label className="form__label" htmlFor="message">Message:</label>
						<textarea className="form__textarea textarea" name="message" placeholder="Message" id="message"></textarea>
					</div>
				</div>

				<div className="form__row row">
					<div className="form__col col">
						<button className="button" type="submit">Send</button>
					</div>
				</div>
			</form>
		</Main>
	)
}
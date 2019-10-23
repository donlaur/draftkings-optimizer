import React from "react"

import { Main } from '../layouts/main'

export default function FeedbackPage() {
	return (
		<Main>
			<form className="feedback-form form form--white" name="send_feedback" method="POST" data-netlify="true" 
			data-netlify-honeypot="bot-field" action="/success">
				<h2 className="form__heading">Comments, suggestions, bugs?</h2>
				
				<input type="hidden" name="form-name" value="send_feedback" hidden />
				<label className="form__label" htmlFor="bot-field" hidden>Don’t fill this out if you're human:</label>
				<input type="hidden" name="bot-field" id="bot-field" hidden/>

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
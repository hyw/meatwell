class UserMailer < ApplicationMailer

	def send_minutes(user_id, meeting)
		user = User.find(user_id)
		@meeting = meeting
    	mail(to: user.email, subject: "#{meeting.title} Meating Minutes")
	end
end

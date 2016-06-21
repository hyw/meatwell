class UserMailer < ApplicationMailer
	default :from => 'minutes@meatwell.io'

	def send_minutes(user_id, meeting)
		user = User.find(user_id)
		@meeting = meeting
    	mail(to: user.email, subject: "[meatwell.io] #{meeting.title} Minutes")
	end
end

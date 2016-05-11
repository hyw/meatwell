module ReadableTokens
	extend ActiveSupport::Concern

	def self.generate_readable_token
		return ADJECTIVES.sample + ADJECTIVES.sample + ANIMALS.sample
	end
end
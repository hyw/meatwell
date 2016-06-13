class Project < ActiveRecord::Base
    extend FriendlyId
    belongs_to :owner, foreign_key: "user_id", class_name: "User"
    has_and_belongs_to_many :users, join_table: "committee_members"
    has_many :meetings
    before_create :generate_slug

    friendly_id :title, use: :slugged

    def as_json(options = {})
        super(options.merge(include: [:owner, :users, :meetings => { :include => :agenda_items }]))
    end

    private


    def generate_slug
        new_access_code = ReadableTokens.generate_readable_token
        access_code_exists = Project.find_by_slug(new_access_code).present?
        while access_code_exists
            new_access_code = ReadableTokens.generate_readable_token
            access_code_exists = Project.find_by_slug(new_access_code).present?
        end
        self.slug = new_access_code
    end

end

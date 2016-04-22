class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :committee_members
  
  has_and_belongs_to_many :projects, join_table: "committee_members"
  has_and_belongs_to_many :organizations, join_table: "organization_users"
  has_many :organization_users
  has_and_belongs_to_many :meetings, join_table: "attendees"
  after_create :assign_user_to_organization


  def assign_user_to_organization
    domain_name = self.email.split('@')[1]
    organization_match = Organization.where(:code => domain_name).first
    if organization_match
      self.organization_users.create(:organization_id => organization_match.id)
    else
      organization = Organization.create(:code => domain_name)
      self.organization_users.create(:organization_id => organization.id)
    end
  end

end

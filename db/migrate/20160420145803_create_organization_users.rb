class CreateOrganizationUsers < ActiveRecord::Migration
  def change
    create_table :organization_users do |t|
      t.references :user, index: true
      t.references :organization, index: true

      t.timestamps null: false
    end
    add_foreign_key :organization_users, :users
    add_foreign_key :organization_users, :organizations
  end
end

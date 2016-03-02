class CreateCommitteeMembers < ActiveRecord::Migration
  def change
    create_table :committee_members do |t|
      t.references :user, index: true
      t.references :project, index: true
      t.integer :status

      t.timestamps null: false
    end
    add_foreign_key :committee_members, :users
    add_foreign_key :committee_members, :projects
  end
end

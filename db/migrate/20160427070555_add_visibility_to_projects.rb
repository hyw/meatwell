class AddVisibilityToProjects < ActiveRecord::Migration
  def change
  	add_column :projects, :visibility, :integer
  end
end

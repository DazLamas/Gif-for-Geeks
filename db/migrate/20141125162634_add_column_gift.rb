class AddColumnGift < ActiveRecord::Migration
  def change

    add_column :gifts, :gift, :string

  end
end

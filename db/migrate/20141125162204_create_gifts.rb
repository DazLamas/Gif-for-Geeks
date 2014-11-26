class CreateGifts < ActiveRecord::Migration
  def change
    create_table :gifts do |t|

      t.timestamps
    end
  end
end

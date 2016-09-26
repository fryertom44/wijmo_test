class CreateResults < ActiveRecord::Migration[5.0]
  def change
    create_table :results do |t|
      t.string :row_label
      t.boolean :is_valid
      t.integer :method_id
      t.string :top
      t.string :batch
      t.text :comments
      t.decimal :conc
      t.datetime :date

      t.timestamps
    end
  end
end

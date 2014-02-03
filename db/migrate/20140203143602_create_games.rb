class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :player1
      t.integer :player2
      t.integer :time
      t.integer :winner
      t.timestamps
    end
  end
end



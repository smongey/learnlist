class AddAttachmentImageToLinks < ActiveRecord::Migration
  def self.up
    change_table :links do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :links, :image
  end
end

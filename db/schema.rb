# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160413050437) do

  create_table "agenda_items", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.integer  "meeting_id", limit: 4
    t.integer  "duration",   limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.datetime "started_at"
    t.datetime "ended_at"
    t.integer  "status",     limit: 4
  end

  add_index "agenda_items", ["meeting_id"], name: "index_agenda_items_on_meeting_id", using: :btree

  create_table "agenda_notes", force: :cascade do |t|
    t.integer  "agenda_item_id", limit: 4
    t.text     "body",           limit: 65535
    t.integer  "order",          limit: 4
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "type",           limit: 4
  end

  add_index "agenda_notes", ["agenda_item_id"], name: "index_agenda_notes_on_agenda_item_id", using: :btree

  create_table "attendees", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "meeting_id", limit: 4
    t.integer  "status",     limit: 4, default: 0
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_index "attendees", ["meeting_id"], name: "index_attendees_on_meeting_id", using: :btree
  add_index "attendees", ["user_id"], name: "index_attendees_on_user_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.string   "body",       limit: 255
    t.integer  "upvotes",    limit: 4
    t.integer  "post_id",    limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "user_id",    limit: 4
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "committee_members", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "project_id", limit: 4
    t.integer  "status",     limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "committee_members", ["project_id"], name: "index_committee_members_on_project_id", using: :btree
  add_index "committee_members", ["user_id"], name: "index_committee_members_on_user_id", using: :btree

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",           limit: 255, null: false
    t.integer  "sluggable_id",   limit: 4,   null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope",          limit: 255
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "meetings", force: :cascade do |t|
    t.string   "title",       limit: 255
    t.integer  "project_id",  limit: 4
    t.datetime "date"
    t.integer  "duration",    limit: 4
    t.integer  "status",      limit: 4,   default: 0
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "leader",      limit: 4
    t.datetime "started_at"
    t.datetime "ended_at"
    t.string   "location",    limit: 255
    t.string   "description", limit: 255
    t.string   "slug",        limit: 255
  end

  add_index "meetings", ["leader"], name: "index_meetings_on_leader", using: :btree
  add_index "meetings", ["project_id"], name: "index_meetings_on_project_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.string   "link",       limit: 255
    t.integer  "upvotes",    limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "user_id",    limit: 4
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.integer  "user_id",    limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "slug",       limit: 255
  end

  add_index "projects", ["user_id"], name: "index_projects_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "username",               limit: 255
    t.string   "gcal_token",             limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  add_foreign_key "agenda_items", "meetings"
  add_foreign_key "agenda_notes", "agenda_items"
  add_foreign_key "attendees", "meetings"
  add_foreign_key "attendees", "users"
  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
  add_foreign_key "committee_members", "projects"
  add_foreign_key "committee_members", "users"
  add_foreign_key "meetings", "projects"
  add_foreign_key "posts", "users"
  add_foreign_key "projects", "users"
end

CREATE TABLE M_SLIP (
  SLIP_ID         INTEGER,              -- ＩＤ
  SLIP_NAME       TEXT,                 -- 名前
  SLIP_TEXT       TEXT,                 -- テキスト
  LAST_UPDATED    TEXT,                 -- 更新日時
  UPDATE_USER     TEXT,                 -- 更新ユーザ
  PRIMARY KEY (
    SLIP_ID
  )
);

CREATE INDEX idx_category_item_code ON M_CATEGORY_ITEM(CATEGORY_ITEM_CODE);
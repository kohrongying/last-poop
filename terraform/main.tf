resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "last-poop-dev"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ItemId"
  range_key      = "DateTime"
  attribute {
    name = "ItemId"
    type = "S"
  }

  attribute {
    name = "DateTime"
    type = "S"
  }

  tags = {
    Environment = "development"
  }
}
resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "last-poop-dev"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "UserId"
  range_key      = "CreatedAt"
  attribute {
    name = "UserId"
    type = "S"
  }

  attribute {
    name = "CreatedAt"
    type = "S"
  }

  tags = {
    Environment = "development"
  }
}
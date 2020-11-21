resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "last-poop-dev"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "UserId"

  attribute {
    name = "UserId"
    type = "S"
  }

  tags = {
    Environment = "development"
  }
}
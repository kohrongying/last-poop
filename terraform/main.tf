resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "last-poop-dev"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 10
  hash_key       = "UserId"
  range_key      = "EventDate"
  
  attribute {
    name = "UserId"
    type = "S"
  }

  attribute {
    name = "EventDate"
    type = "S"
  }

  tags = {
    Environment = "development"
  }
}
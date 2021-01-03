resource "aws_iam_user" "dev" {
  name = "last-poop-dev-admin-user"
  path = "/"

  tags = {
    Environment = "development"
  }
}

resource "aws_iam_user_policy" "dev_policy" {
  name = "last-poop-dev-admin-policy"
  user = aws_iam_user.dev.name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*"
      ],
      "Effect": "Allow",
      "Resource": "${aws_dynamodb_table.basic-dynamodb-table.arn}"
    }
  ]
}
EOF
}

resource "aws_iam_access_key" "dev" {
  user    = aws_iam_user.dev.name
}

# output "secret" {
#   value = aws_iam_access_key.dev
# }
## Emailer Router

The emailer router is used to manage the retrieval, addition, modification, and deletion of HTML email templates. It may also manage the sending of emails. It is protected so that only admins have access.

### Add Email Template (Admin Only)

`POST api/v1/protected/emailer/add_template/`

Uploads an HTML file named '`name`_template.html' with `template` as the content and the admin ID as 'x-amz-meta-userid' metadata to the 'email_templates/' folder of the 'sftt-user-uploads' S3 bucket.

#### Request Body

```json
{
    "name" : STRING,
    "template" : STRING
}
```

#### Responses

##### `200 OK`

Template successfully added.

##### `400 BAD REQUEST`

If the request was malformed.

##### `403 FORBIDDEN`

If the S3 bucket policy does not permit access.

### Edit Email Template (Admin Only)

`POST api/v1/protected/emailer/edit_template/`

Overwrites an existing HTML file named '`html_full_name`' with `template` as the content and the admin ID as 'x-amz-meta-userid' metadata to the 'email_templates/' folder of the 'sftt-user-uploads' S3 bucket.

#### Request Body

```json
{
    "html_full_name" : STRING,
    "template" : STRING
}
```

#### Responses

##### `200 OK`

Template successfully added.

##### `400 BAD REQUEST`

If the request was malformed.

##### `403 FORBIDDEN`

If the S3 bucket policy does not permit access.

### Delete Email Template (Admin Only)

`POST api/v1/protected/emailer/delete_template/`

Deletes an existing HTML file named '`html_full_name`' in the 'email_templates/' folder of the 'sftt-user-uploads' S3 bucket.

#### Request Body

```json
{
    "html_full_name" : STRING,
    "template" : STRING
}
```

#### Responses

##### `200 OK`

Template successfully added.

##### `400 BAD REQUEST`

If the request was malformed.

##### `403 FORBIDDEN`

If the S3 bucket policy does not permit access.

### Load Email Template (Admin Only)

`GET api/v1/protected/emailer/load_template/`

Loads an existing HTML file named '`html_full_name`' in the 'email_templates/' folder of the 'sftt-user-uploads' S3 bucket.

#### Request Body

```json
{
    "html_full_name" : STRING,
    "template" : STRING
}
```

#### Responses

##### `200 OK`

Template successfully added.

##### `400 BAD REQUEST`

If the request was malformed.

##### `403 FORBIDDEN`

If the S3 bucket policy does not permit access.
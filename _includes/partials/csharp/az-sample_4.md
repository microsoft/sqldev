```csharp
private static async Task<string> GetPasswordFromKeyVault()
{
    /* The next four lines of code show you how to use AppAuthentication library to fetch secrets from your key vault */
    AzureServiceTokenProvider azureServiceTokenProvider = new AzureServiceTokenProvider();
    KeyVaultClient keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback));
    SecretBundle secret = await keyVaultClient.GetSecretAsync("https://your_key_vault_name.vault.azure.net/secrets/AppSecret");
    return secret.Value;
}
```
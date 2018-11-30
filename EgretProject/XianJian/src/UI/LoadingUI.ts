class LoadingUI extends BaseUI implements RES.PromiseTaskReporter
{
    private progressBar: eui.ProgressBar = null;

    protected childrenCreated(): void
    {
        console.log("");
        
    }

    public onProgress(current: number, total: number): void 
    {
        this.progressBar.labelDisplay.text  = `${current}/${total}`;
    }
}
# 二叉树相关

### 结构定义

```c++
typedef struct Tree TreeNode;
struct Tree{
    int value;
    struct Tree* Left;
    struct Tree* Right;
    Tree(int val){
        value = val;
        Left = nullptr;
        Right = nullptr;
    }
};
```

### 二叉搜索树

#### 建树

```c++
TreeNode* insert(TreeNode* t, int value){
    if (!t){
        auto* root = new TreeNode (value);
        return root;
    }
    if (value < t->value) t->Left = insert(t->Left, value);
    if (value > t->value) t->Right = insert(t->Right, value);
    return t;
}
int main(){
  int tree[10] = {7,8,10,9,1,3,2,4,6,5};
  TreeNode* root = nullptr;
  for (int i : tree) {
      root = insert(root, i);
  }
}
```

### 遍历(递归&迭代)

* **三种遍历方法都只是输出语句的位置发生了变化**

#### 前序遍历（中——左——右）

```c++
//recursion version
void PreOrder(TreeNode* t, int level){
    if (!t) return;
    cout<<"value: "<<t->value<<"   level "<<level<<endl;
    PreOrder(t->Left, level + 1);
    PreOrder(t->Right, level + 1);
}
//iteration version
void PreOrder2(TreeNode* t){
    if (!t) return;
    stack<TreeNode*> s;
    s.push(t);
    while (!s.empty()){
        TreeNode* temp = s.top();
        s.pop();
        cout<<temp->value<<"  ";
        if (temp->Right) s.push(temp->Right);
        if (temp->Left) s.push(temp->Left);
    }
}
```

#### 中序遍历（左——中——右）

```c++
//recursion version
void InfixOrder(TreeNode* t, int level){
    if (!t) return;
    InfixOrder(t->Left, level + 1);
    cout<<"value: "<<t->value<<"   level "<<level<<endl;
    InfixOrder(t->Right, level + 1);
}
//iteration version
void InfixOrder2(TreeNode* t){
    if (!t) return;
    stack<TreeNode*> s;
    do {
        while (t){
            s.push(t);
            t=t->Left;
        }
        if (!s.empty()){
            TreeNode* temp = s.top();
            s.pop();
            cout<<temp->value<<"   ";
            t = temp->Right;
        }
    } while (!s.empty() || t);
}
```

#### 后序遍历（左——右——中）

```c++
void PostOrder(TreeNode* t, int level){
    if (!t) return;
    PostOrder(t->Left, level + 1);
    PostOrder(t->Right, level + 1);
    cout<<"value: "<<t->value<<"   level "<<level<<endl;
}
```

### 相关题目

#### 重构二叉树

1. 已知前序、中序遍历的数组，重构二叉树，并输出后序遍历的数组：

```c++
TreeNode* RBT_Pre_Infix(const vector<int>& pre, const vector<int>& infix){
    int length = pre.size();
    if (length == 0) return nullptr;
    //前序遍历数组的第一个元素是根节点
    auto* root = new TreeNode(pre[0]);
    int rootIndex = 0;
    //在中序遍历的数组中找到根节点，根节点的左边是左子树，右边是右子树
    while (rootIndex < length){
        if (infix[rootIndex] == root->value){
            break;
        }
        rootIndex++;
    }
    //求出左子树的长度
    int left_length = rootIndex;
    vector<int> pre_left(pre.begin() + 1, pre.begin() + left_length + 1);//前序的左子树
    vector<int> pre_right(pre.begin() + left_length + 1, pre.end());//前序的右子树
    vector<int> infix_left(infix.begin(), infix.begin() + left_length);//中序的左子树
    vector<int> infix_right(infix.begin() + left_length + 1, infix.end());//中序的右子树
    //递归重构左子树和右子树
    root->Left = RBT_Pre_Infix(pre_left, infix_left);
    root->Right = RBT_Pre_Infix(pre_right, infix_right);
    return root;
}
```

2. 已知后序和中序遍历数组，重构出二叉树，并输出前序遍历数组：

```c++
TreeNode* RBT_Post_Infix(vector<int>& post, vector<int>&infix){
    int length = post.size();
    if (length == 0) return nullptr;
    auto* root = new TreeNode (post[length - 1]);
    int rootIndex = 0;
    while (rootIndex < length){
        if (infix[rootIndex] == root->value) break;
        rootIndex++;
    }
    int left_length = rootIndex;
    vector<int> left_post(post.begin(), post.begin() + left_length);
    vector<int> right_post(post.begin() + left_length, post.end() - 1);
    vector<int> left_infix(infix.begin(), infix.begin() + left_length);
    vector<int> right_infix(infix.begin() + left_length + 1, infix.end());
    root->Left = RBT_Post_Infix(left_post, left_infix);
    root->Right = RBT_Post_Infix(right_post, right_infix);
    return root;
}
```

3. 已知前序和后序，是无法重构出二叉树的，因为左右子树没有明确的分割线。

#### 求二叉树深度

